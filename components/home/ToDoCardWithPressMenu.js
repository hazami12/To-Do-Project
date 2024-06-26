import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  renderers,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  addWorkoutToCalendar,
  deleteDocument,
  updateLastPerformedDate,
} from "../../data/firestopreRealTime";
import ToDoCard from "../singleTask/ToDoCard";

const { SlideInMenu } = renderers;

const ToDoCardWithPressMenu = (props) => {
  const workout = props.workout;

  const title = props.workout.name;
  const lastPreformed = props.workout.lastPreformed;
  const exercises = props.workout.exercises;
  const key = props.workout.key;
  const SetItemChange = props.SetItemChange;

  const navigation = useNavigation();
  return (
    <View key={workout.key}>
      <Menu renderer={SlideInMenu}>
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: TouchableWithoutFeedback,
          }}
        >
          <ToDoCard workout={workout}></ToDoCard>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 36, backgroundColor: "#1B1B1B" }}
            onSelect={() => {
              navigation.navigate("ToDoScreen", {
                title,
                lastPreformed,
                exercises,
                key,
              });
              updateLastPerformedDate(
                workout.key,
                new Date().toLocaleDateString()
              );
              addWorkoutToCalendar();
              SetItemChange((value) => !value);
            }}
          >
            <Text
              style={{
                fontFamily: "LexendDeca_700Bold",
                fontSize: 19,
                color: "white",
              }}
            >
              Start Task
            </Text>
          </MenuOption>
          <MenuOption
            // style={{ padding: 36 }}
            onSelect={() => {
              deleteDocument("users", key).then(
                SetItemChange((value) => !value)
              );
            }}
          >
            <Text
              style={{
                padding: 36,
                fontFamily: "LexendDeca_400Regular",
                fontSize: 16,
                color: "red",
              }}
            >
              Delete
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default ToDoCardWithPressMenu;
