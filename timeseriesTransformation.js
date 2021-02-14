const responseToTimeseries = (response) => {
    let resultingObj = {}
    response.forEach((obj, i) => {
      let currentIteration = i
      obj.data.forEach((arr, currentArray) => {
        if (!resultingObj.hasOwnProperty(arr[0])) {
          resultingObj[arr[0]] = {
            x: arr[0]
          }
        }
        if (!resultingObj[arr[0]].hasOwnProperty('points')) {
          if (currentIteration !== 0) {
            if(!(response[currentIteration - 1].data[currentArray])){
              resultingObj[arr[0]].points = [0]
              resultingObj[arr[0]].points.push(arr[1])
            } else {
              resultingObj[arr[0]].points = [arr[1]]
            } 
          } else {
            resultingObj[arr[0]].points = [arr[1]]
          }
        } else {
          if (currentArray !== 0) {
            if(!(response[currentIteration - 1].data[currentArray])){
              resultingObj[arr[0]].points.push(0)
              resultingObj[arr[0]].points.push(arr[1])
            } else {
              resultingObj[arr[0]].points.push(arr[1])
            }
        } else {
          resultingObj[arr[0]].points.push(arr[1])
        }
      }
  
        if (!resultingObj[arr[0]].hasOwnProperty('total')) {
          resultingObj[arr[0]].total = arr[1]
        } else {
          resultingObj[arr[0]].total += arr[1]
        }
      })
    })
    return resultingObj;
  };