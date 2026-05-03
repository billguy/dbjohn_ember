import SloganForm from 'dbjohn-ember/components/slogan-form';

<template>
  <h1>New slogan</h1>
  <SloganForm @model={{@model}} @submitAction={{@controller.submit}} />
</template>
