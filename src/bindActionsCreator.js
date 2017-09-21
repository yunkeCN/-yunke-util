import { bindActionCreators } from "redux"

const bindActionsCreator = actionsMap => dispatch => bindActionCreators(actionsMap, dispatch)

export default bindActionsCreator