import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { geBoard, setDuplicateBox, validateInputData, solve } from "../store/actions"
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native';

export default function BoxComponent() {
    
    const [ duplicateBoard, setDuplicateBoard ] = useState([]) 
    const board = useSelector(state => state.board) // {}
    const difficult = useSelector(state => state.difficult)
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()
    const dataInput = {
      row: 0,
      column: 0,
      value: 0
    }
    // console.log(status, " ini status di boxComponent")

    useEffect(() => {
      // console.log("Love you")
      // console.log(difficult, "difficult dari Box Component")
      dispatch(geBoard(difficult))
    }, [])
    
    useEffect(() => {
      const deepClonedObject = _.cloneDeep(board)
      setDuplicateBoard(deepClonedObject)
    }, [board])
    // console.log(board.length, "<<-------- Length nya")
    // console.log(board, "<<--------INI APAAN SIH")
    
    
    function handleInput(row, column, text) {
      const dataInputNumber = Number(text)
      const tampDataBoard = _.cloneDeep(duplicateBoard)
      dataInput.row = row
      dataInput.column = column
      dataInput.value = dataInputNumber
      tampDataBoard[dataInput.row][dataInput.column] = dataInput.value
      // dispatch(setDuplicateBox(tampDataBoard))
      // console.log(dataInput, "---New")
      setDuplicateBoard(tampDataBoard)
    }

    function InputData(data) {
      // console.log("hihi")
      const createTwoButtonAlert = () =>
      // console.log("woy ini alert Input Data")
      Alert.alert(
        "Alert Title",
        "Do You Will Check your answer, and end the game ?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => dispatch(validateInputData(duplicateBoard)) }
        ],
        { cancelable: false }
        );
        if(data) {
        createTwoButtonAlert()
      }
      // console.log("--masuk1")
    }
    
    function SolvedData(data) {
      // console.log("test")
      const createTwoButtonAlert = () =>
      // console.log("ini alert")
      Alert.alert(
        "Alert Title",
        "Do You Give Up?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => dispatch(solve(board)) }
        ],
        { cancelable: false }
        );
        if(data) {
          createTwoButtonAlert()
        }
      }

      
      const navigation = useNavigation();

      if(status === "unsolved") {
        // console.log("Hshshs")
        navigation.replace("Finish")
      }
      
      return (
        <>
        {
          !board &&
          <View style={styles.container}>
          <Text>Loading</Text>
            <StatusBar style="auto" />
          </View>
        }
        {
          board.length > 0 &&
          <View style={styles.container}>
           {/* <Text>{JSON.stringify(status)}</Text> */}
            {console.log(duplicateBoard, "ini yang di render")}
            {
              board.map((oneSquare, idxSatu) => {
                return(
                    <View style={styles.cssSatu} key={idxSatu}>
                    {
                      oneSquare.map((el, idxDua)=>{
                        //  {console.log(el)}
                        if(el !== 0) {
                          // console.log(`${idxSatu}, ${idxDua} [${el}], "-bukan 0"`)
                          return (
                            <View style={styles.box} key={idxDua}>
                              <Text>
                                {el}
                              </Text>
                            </View>
                          )
                        } else {
                          // console.log(idxSatu, idxDua, "-ini 0")
                          return (
                              <TextInput 
                              style={styles.boxDua}
                              key={idxDua}
                              onChangeText={text => handleInput(idxSatu, idxDua, text)}
                              keyboardType = "number-pad"
                              />
                          )
                        }
                      })
                    }
                    </View>
                )
              })
            }
            <View style={styles.cssDua}>
              <Button
              onPress={(data) => InputData(true)}
              title="Submit"
              color="#841584"
              />
              <Button
              onPress={(data) => SolvedData(true)}
              title="Solved"
              color="#841584"
              />
            </View>
          </View>
        }
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 0,
    margin: 1,
    alignSelf: 'center'
  },
  textStyle: {
      flex: 0,
      fontSize: 80,
      textAlign: "center",
      alignItems: 'center',
    justifyContent: 'center',
  },
  cssSatu: {
    flexDirection: "row"
  },
  cssDua: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  box: {
    backgroundColor: "red",
    width: 30, // 10% kalau di HP
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 80,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 0,
    margin: 1,
    alignSelf: 'center'
  },
  boxDua: {
    backgroundColor: "blue",
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 0,
    margin: 1,
    alignSelf: 'center'
  }
});