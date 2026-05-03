import PostForm from 'dbjohn-ember/components/post-form';

<template>
  <h1>Editing '{{@model.title}}'</h1>
  <PostForm @model={{@model}} />
</template>
