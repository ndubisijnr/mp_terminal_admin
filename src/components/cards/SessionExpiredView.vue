<script setup lang="ts">
import {router} from "@/router/index";
import MazDialog from 'maz-ui/components/MazDialog'
import MazBtn from "maz-ui/components/MazBtn";
// import StoreUtils from "@/util/storeUtils";


// const sessionExpired = StoreUtils.getter()?.auth.getSessionExpired


function toLogin(){
router.push({path:'/login'})
}


</script>

<template>
  <MazDialog title="Session Expired">
    <p>
      Session Expired Please Login Again
    </p>
    <template #footer="{ close }">
      <MazBtn @click="toLogin">
        Confirm
      </MazBtn>
    </template>
  </MazDialog>

</template>

<style scoped>
[v-cloak] {
    display: none;
  }

  .sidebar-menubar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 100px;
    height: calc(100% - 30%);
  }

  .content-header{
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #fff;
}

.content-inner-container-right{
  display: flex;
  align-items: center;
}


  .loading-wrapper{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
  }
.dashboard-wrapper-layout{
  width: 100%;
  background-color: #fff !important;
  display: flex;
  height: 100vh;

}

.dashboard-main{
  width: calc(100% - 294px);
  min-height: 100%;
  overflow: auto;
}

.authView{
  width: 100% !important;
}



.sidebar-wrapper{
  width: 294px;
  background-color: var(--light_primary);
  display: block;
  transition: ease-in 0.3s;
  /* Sidebar navigation */
  padding: 25px;
  height: 100vh;
  overflow: auto;

  /* Bizgem primary */

  /* Inside auto layout */

}



.sidebar-top-nav{
  width: 100%;
}

.sidebar-bottom-nav{
  width: 100%;
}

.search-input{
  /* Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10.5px 14.7px;
gap: 8.4px;

width: 100%;
height: 47px;

background: rgba(167, 196, 222, 0.02);
/* White */
border: 1.05px solid #F7F7F7;
box-shadow: 0px 1.05px 2.1px rgba(16, 24, 40, 0.05);
border-radius: 8.4px;
margin: 25px 0;

/* Inside auto layout */
flex: none;
/* order: 0;
align-self: stretch;
flex-grow: 0; */

}

.search-input::placeholder{
  color: #fff;
}


.nav-item-base{
  /* _Nav item base */

  /* Auto layout */
  display: flex;
  align-items: center;
  padding: 8.4px 12.6px;
  gap: .4rem;

  width: 100%;
  height: 42px;
  /* Text */

  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  /* identical to box height, or 150% */

  /* Gray/100 */
  color: #fff;

  margin-bottom: 12px;
  cursor: pointer;

}

.nav-item-base:hover{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #0F3E5F;
  border-radius: 6.3px;

}

.active-nav{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #0F3E5F;
  border-radius: 6.3px;
}

.no-sidebar{
  width: 0;
  opacity:0;
  background-color: #fff;
  display: none;
}

@media (max-width: 1024px) {
  .sidebar-wrapper{
    display: none;

  }

}

@media (max-width: 1024px) {
  .dashboard-main{
    width: 100%;
    min-height: 100%;
  }

}

@media (max-width: 700px) {
  .dashboard-wrapper-layout{
    display: none;
  }
}
</style>