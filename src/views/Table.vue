<template>
<div class="table">
  <RouterLink :to="{ name: 'Home' }" class="table__back-home"> 🔙 </RouterLink>
  <p class="table__title">表格</p>
  <div class="table__container">
    <p>
      一個對應一個，ex：日期-銷售額
    </p>
    <img src="/table_1.png" alt="table_1" class="table__image">
  </div>
  <div class="table__container">
    <p>一個對應多個，時間對應多個品項</p>
    <img src="/table_2.png" alt="table_2" class="table__image">
  </div>
  <div class="table__container">
    <p>ex：在店家項目裡，還有往下再對應的細項</p>
    <img src="/table_3.png" alt="table_3" class="table__image">
  </div>
</div>
</template>
<style lang="scss">
.table{
  &__back-home {
    font-size: 30px;
  }

  &__title{
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  &__container{
    border: solid 1px black;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  &__image{
    width: 600px;
    aspect-ratio: 7/2 ;
  }
}
</style>
