import { Alert } from "react-native";

export interface AlertDialogObject {
  title: string;
  message: string;
  actionButtonTitle: string;
  action: () => void;
}

class AlertDialog {
  showAlert = (input: AlertDialogObject) => {
    Alert.alert(input.title, input.message, [
      {
        text: input.actionButtonTitle,
        onPress: input.action,
      },
      {
        text: "cancel",
        style: "cancel",
      },
    ]);
  };
}

const alertDialog = new AlertDialog();
export default alertDialog;
