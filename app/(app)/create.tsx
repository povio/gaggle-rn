import { useNavigation } from "expo-router";
import { useEffect } from "react";

import CreateFlowerForm from "@/modules/flowers/components/CreateFlowerForm";

const CreateFlowerScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Create Flower", presentation: "modal" });
  }, [navigation]);

  return <CreateFlowerForm />;
};

export default CreateFlowerScreen;
