const musicReducer = function (state={currentMusic:{}}, action) {
    console.log(action)
    switch (action.type) {
        // 当派发的事件是count_add的时候执行某些操作并返回
        case "OTHER_MUSIC":
            return {
                ...state,currentMusic:action.payload
            }
        default:
            return state
    }
}

export default musicReducer