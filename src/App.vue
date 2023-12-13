<template>
  <div>
    <Header />
    <div class="container">
      <Hero />
      <UsersList
        :users="usersList"
        :isShowMore="isShowMore"
        @showMoreClick="onShowMoreClick"
      />
      <UserRegistrationSection />
    </div>
  </div>
</template>
<script>
import { toRefs, ref } from "vue";
import { useUsersStore } from "@/stores/users";
import "@/assets/css/base.scss";
import Header from "@/components/Header.vue";
import Hero from "./components/Hero.vue";
import UsersList from "./components/users/UsersList.vue";
import UserRegistrationSection from "@/components/users/UserRegistrationSection.vue";
export default {
  components: { Header, Hero, UsersList, UserRegistrationSection },
  setup() {
    const usersStore = useUsersStore();
    usersStore.fetchUsers();

    const usersData = toRefs(usersStore);
    const usersList = ref(usersData.users);
    const isShowMore = ref(usersData.isShowMore);
    const onShowMoreClick = () => {
      console.log("show more clicked");
      usersStore.fetchUsers();
    };
    return { usersList, isShowMore, onShowMoreClick };
  },
};
</script>

<style scoped></style>
