<template>
    <div>
        {{title}}
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'header'
    }
  }
}
</script>

<style lang="scss" scoped>
    div {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: white;
    }
</style>
