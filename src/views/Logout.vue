<template>
  <div>logging you out...</div>
</template>

<script>
import { logOut } from '../firebase';
import router from '../router';

export default {
    name:"Logout",
    async created(){
        await logOut();
        this.$store.commit("lootStore");
        router.push({
            name:"Home",
        });
    }
}
</script>

<style>

</style>