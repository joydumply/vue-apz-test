<template>
  <div class="users-list-wrap">
    <Heading class="users-list-heading" content="Working with GET request" />

    <template v-if="usersList">
      <div class="users-list">
        <UserItem
          class="user-item"
          v-for="(user, key) in usersList"
          :user="user"
          :key="key"
        />
      </div>

      <Button
        v-if="isShowMore"
        class="btn-show-more"
        text="Show more"
        @click="onShowMoreClick"
      />
    </template>
  </div>
</template>
<script>
import { computed } from "vue";
import Heading from "../basic/Heading.vue";
import UserItem from "./UserItem.vue";
import Button from "../basic/Button.vue";
export default {
  components: {
    Heading,
    UserItem,
    Button,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    isShowMore: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const usersList = computed(() => props.users || null);

    const onShowMoreClick = () => {
      emit("showMoreClick");
    };

    return { usersList, onShowMoreClick };
  },
};
</script>
<style lang="scss">
.users-list-heading {
  margin-bottom: 50px;
  text-align: center;
}

.users-list {
  display: flex;
  flex-wrap: wrap;
  gap: 29px;
  margin-bottom: 50px;

  .user-item {
    width: 370px;
    max-width: 100%;
  }
}
.btn-show-more {
  width: 120px;
  margin-left: auto;
  margin-right: auto;
}
.users-list-wrap {
  margin-bottom: 140px;
}
</style>
