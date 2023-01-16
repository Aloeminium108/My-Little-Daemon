import { Component } from "./component.js";
class Grid extends Component {
    constructor(columns, numRows, numColumns) {
        super();
        this.columns = columns;
        this.numRows = numRows;
        this.numColumns = numColumns;
    }
}
export { Grid };
