import Service from '@ember/service';
import { service } from '@ember/service';
import SparkMD5 from 'spark-md5';

class FileChecksum {
  constructor(file) {
    this.file = file;
    this.chunkSize = 2097152; // 2MB
    this.chunkCount = Math.ceil(file.size / this.chunkSize);
    this.chunkIndex = 0;
    this.fileSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
  }

  createMD5() {
    return new Promise((resolve, reject) => {
      this.md5Buffer = new SparkMD5.ArrayBuffer();
      this.fileReader = new FileReader();
      this.fileReader.onload = (event) => {
        this.md5Buffer.append(event.target.result);
        if (!this.readNextChunk()) {
          resolve(btoa(this.md5Buffer.end(true)));
        }
      };
      this.fileReader.onerror = reject;
      this.readNextChunk();
    });
  }

  readNextChunk() {
    if (this.chunkIndex < this.chunkCount) {
      const start = this.chunkIndex * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      this.fileReader.readAsArrayBuffer(
        this.fileSlice.call(this.file, start, end),
      );
      this.chunkIndex++;
      return true;
    }
    return false;
  }

  static MD5(file) {
    return new FileChecksum(file).createMD5();
  }
}

class ActiveStorageBlob {
  constructor(file, checksum) {
    this.file = file;
    this.checksum = checksum;
    this.id = null;
    this.signedId = null;
    this.key = null;
    this.directUploadData = null;
  }

  get name() {
    return this.file.name;
  }
  get type() {
    return this.file.type;
  }
  get size() {
    return this.file.size;
  }
  slice() {
    return this.file.slice();
  }

  static build(file) {
    return FileChecksum.MD5(file).then(
      (checksum) => new ActiveStorageBlob(file, checksum),
    );
  }
}

function xhrRequest(xhr, url, options) {
  return new Promise((resolve, reject) => {
    xhr.open(options.method || 'GET', url);
    if (options.headers) {
      Object.keys(options.headers).forEach((key) =>
        xhr.setRequestHeader(key, options.headers[key]),
      );
    }
    if (options.contentType) {
      xhr.setRequestHeader('Content-Type', options.contentType);
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response =
          options.dataType === 'text'
            ? xhr.responseText
            : xhr.responseText
              ? JSON.parse(xhr.responseText)
              : undefined;
        resolve(response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onabort = () => reject(xhr.statusText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(options.data);
    xhr.dispatchEvent(new CustomEvent('XHROpened', { detail: xhr }));
  });
}

class Uploader {
  constructor({ headers, metadata, ...events }) {
    this.headers = headers;
    this.metadata = metadata;
    this.events = events;
  }

  async upload(blob, url) {
    const response = await this._directUpload(blob, url);
    blob.id = response.id;
    blob.signedId = response.signed_id;
    blob.key = response.key;
    blob.directUploadData = response.direct_upload;
    await this._blobUpload(blob);
    return blob;
  }

  _directUpload(blob, url) {
    const xhr = new XMLHttpRequest();
    this._addCreatedListener(xhr);
    return xhrRequest(xhr, url, {
      method: 'POST',
      headers: this.headers,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        blob: {
          filename: blob.name,
          content_type: blob.type,
          byte_size: blob.size,
          checksum: blob.checksum,
          metadata: this.metadata,
        },
      }),
    });
  }

  _blobUpload(blob) {
    const xhr = new XMLHttpRequest();
    this._addCreatedListener(xhr);
    xhr.upload.addEventListener('progress', (event) => {
      const progress = Math.ceil((event.loaded / event.total) * 100);
      if (progress) this.events.onProgress?.(progress, event);
    });
    return xhrRequest(xhr, blob.directUploadData.url, {
      method: 'PUT',
      headers: blob.directUploadData.headers,
      dataType: 'text',
      data: blob.slice(),
    });
  }

  _addCreatedListener(xhr) {
    xhr.addEventListener('XHROpened', ({ detail }) =>
      this.events['onXHROpened']?.(detail),
    );
  }
}

export default class ActiveStorageService extends Service {
  @service session;

  get headers() {
    const accessToken = this.session.data?.authenticated?.access;
    return { Authorization: `Bearer ${accessToken}` };
  }

  upload(file, url, options = {}) {
    const { metadata, ...callbacks } = options;
    const uploader = new Uploader({ headers: this.headers, metadata, ...callbacks });
    return ActiveStorageBlob.build(file).then((blob) => uploader.upload(blob, url));
  }
}
