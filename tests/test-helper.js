import Application from 'dbjohn-ember/app';
import config from 'dbjohn-ember/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import './helpers/flash-message';


setApplication(Application.create(config.APP));

start();
