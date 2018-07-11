import tool from '../api/tool';
export default {/*类似于映射 */
    showTime(state){
        return tool.timeFormat(state.startTime)+' - '+tool.timeFormat(state.endTime)
    }
}