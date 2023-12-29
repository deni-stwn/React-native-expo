// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import { Feather } from "@expo/vector-icons";

// const InputText = ({
//   label,
//   type,
//   onTextChange,
//   placeholder,
//   password = false,
// }) => {
//   const [value, setValue] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTextChange = (text) => {
//     setValue(text);
//     if (onTextChange) {
//       onTextChange(text);
//     }
//   };

//   return (
//     <View style={{ width: "100%" }}>
//       <Text style={{ paddingLeft: 15, paddingBottom: 2 }}>{label}</Text>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           height: 38,
//           paddingHorizontal: 14,
//           marginBottom: 20,
//           borderWidth: 2,
//           borderColor: "#D9D9D9",
//           borderRadius: 14,
//         }}
//       >
//         <TextInput
//           secureTextEntry={showPassword}
//           keyboardType={type}
//           placeholder={placeholder}
//           onChangeText={handleTextChange}
//           value={value}
//           style={{ flex: 1 }}
//         />
//         {password && (
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             {showPassword ? (
//               <Feather name="eye-off" size={20} color="black" />
//             ) : (
//               <Feather name="eye" size={20} color="black" />
//             )}
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default InputText;

// const styles = StyleSheet.create({});
