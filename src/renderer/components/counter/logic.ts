import Counter from "./display";

import { increment, reset } from "../../store/counter/actions";
import { valueSelector } from "../../store/counter/reducers";
import { RootState, counterSelector } from "../../store/";
import { connect } from "react-redux";

const mapState = (state: RootState) => ({
  value: valueSelector(counterSelector(state))
});

const mapDispatch = {
  increment,
  reset
};

export default connect(mapState, mapDispatch)(Counter);
