const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (strNums === ""){
    throw new BadRequestError("nums are required.")
  }
  let nums = strNums.split(",");
  let intNums = []
  for(let num in nums){
    if (!parseInt(nums[num])){
      throw new BadRequestError(`${nums[num]} is not a number`)
    } else {
      intNums.push(parseInt(nums[num]))
    }
  }
  return intNums;
}


module.exports = { convertStrNums };