import { ref } from "vue";

export const useDialog = () => {
  const visible = ref(false);
  const showDialog = () => {
    visible.value = true;
  };
  const hideDialog = () => {
    visible.value = false;
  };
  return {
    visible,
    showDialog,
    hideDialog,
  };
};
