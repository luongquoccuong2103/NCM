import { Snackbar } from "react-native-paper";

const SnackbarComponent = ({ message, visible, onPressVisible }) => {
  return (
    <Snackbar visible={visible} onDismiss={onPressVisible} duration={1000}>
      {message}
    </Snackbar>
  );
};

export default SnackbarComponent;
