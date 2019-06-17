<template>
  <div class="errCont">
    <div id="container">
      <div class="rows">
        <img class="png" src="../assets/404.png">
      </div>
      <div class="rows">
        <img class="png" src="../assets/404_msg.png">
      </div>
      <div class="rows link">
        <router-link to="/home">
          <img class="png" src="../assets/404_to_index.png">
        </router-link>
      </div>
    </div>
    <div id="cloud" class="png"></div>
  </div>
</template>

<style lang="scss" scoped>
.errCont {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 600px;
  min-height: 620px;
  background: url("../assets/error_bg.jpg") repeat-x scroll 0 0 #67ACE4;
}
#container {
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    width: 560px;
}
#container img {
    border: medium none;
    margin-bottom: 50px;
}
#container .link img {
    margin-bottom: 0;
}
#cloud {
    background: url("../assets/error_cloud.png") repeat-x scroll 0 0 transparent;
    bottom: 0;
    height: 170px;
    position: absolute;
    width: 100%;
}
</style>
