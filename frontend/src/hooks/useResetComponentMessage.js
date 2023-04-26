//Redux
import { resetMessage } from "../slices/photoSlice";

export const useResetCompomentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
