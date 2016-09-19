const App = React.createClass({
  getInitialState() {
    return {
      transactions: [0],
      balance: 0.00,
      editTransaction: '',
      currentEdit: ''

    }
  },

  addNewTransaction(newTransaction) { // argument is the new transaction that was passed from prop in component
    let {transactions} = this.state;
    this.setState({
      transactions: [...transactions, newTransaction],
      balance: this.updateBalance
    });

  },

  removeTransaction(id) {
    console.log("transaction removed: ", id );
    let {transactions} = this.state; //array of current transactions
    this.setState({
      transactions: transactions.filter(transaction => transaction.id !== id //removes only the transaction that matches the unique id

      )
    });
  },

  editTransaction(curr) {
    let {transactions} = this.state;
    console.log(curr.getId);
    this.setState({
      editTransaction: '',
      currentEdit: curr.id
    });
  },

  updateBalance() {
    let total = 0;
    let {transactions} = this.state;
    if (getElementById("debitRadio").checked) {
      console.log("debit");
    } else if (getElementById("creditRadio").checked){
      console.log("credit");
    }

  },

  render() {

    const {transactions, balance, editTransaction} = this.state;
    console.log("this is current Edit: ", this.state.currentEdit);

    return (
      <div>
      <h1 id="title">movie app</h1>
      <h4 className="text-right">something <span id="balance" ref="balance">$ {balance}</span></h4>
      <TransactionForm addNewTransaction = {this.addNewTransaction}  />
      <TransactionTable transactions = {transactions}  editedTransaction = {this.editTransaction} removeTransaction = {this.removeTransaction} />
      </div>
    )
  }
}) // end of App component

const TransactionTable = React.createClass( {
  getInitialState() {
    return {
      editName: '',
      editAmount: '',
      getId: ''
    }
  },

  getName(e) {
    let name = e.target.value; //editForms name value
    console.log("name", name);
    this.setState({
      editName: name
    });

  },

  getAmount(e) {
    let amount = e.target.value; //editForms amount value
    this.setState({
      editAmount: amount
    });

  },

  setNewEdit() {

  },

  getId(id) {
    let {getId} = this.state;
    let currId = id;
    this.setState({
      getId: currId
    });
    console.log(currId);

  },

  makeEdit() {
    let {transactions} = this.state;
    let newEdit  = {
      editName: this.state.editName,
      editAmount: this.state.editAmount,
      editId: this.state.editId

    } //end of newEdit object
    console.log("THis is newEdit: ", newEdit);

    this.props.editedTransaction(newEdit);

  },

  render() {

    const {transactions, removeTransaction, editTransaction, childState} = this.props;
    return (
      <div className='container'>
        <table className="table">
          <thead>
            <tr className="col-xs-12 row">
              <th className="col-xs-3 text-center">Name</th>
              <th className="col-xs-3 text-center">Rating</th>
              <th className="col-xs-3 text-center">Thumbs Up</th>
              <th className="col-xs-3 text-center">Thumb Down</th>
              <th className="col-xs-3 text-center">Delete</th>
            </tr>
          </thead>
      <tbody>
        {transactions.map((transaction) => // maps through transactions
        (
          <tr className="col-xs-12 row" key={transaction.id} id= {transaction.id}>
            <td className="col-xs-3 text-center">{transaction.name}</td>
            <td className="col-xs-3 text-center">{transaction.amount}</td>
            <td className="col-xs-3 text-center"><button id="del" className="btn glyphicon glyphicon-thumbs-up btn-md" onClick={removeTransaction.bind(null, transaction.id)}></button></td>
            <td className="col-xs-3 text-center"><button id="del" className="btn glyphicon glyphicon-thumbs-down btn-md" onClick={removeTransaction.bind(null, transaction.id)}></button></td>
            <td className="col-xs-3 text-center"><button id="del" className="btn btn-danger btn-md" onClick={removeTransaction.bind(null, transaction.id)}>X</button></td>
          </tr>
        ) //end of return
      ) //end of map
    }
    </tbody>

    </table>
    </div>
  ) //end of return
}
})//end of

const TransactionForm = React.createClass({


  submitForm(e) {
    e.preventDefault();
    let {transactionIn, amountIn} = this.refs;
    let transaction = {   // On Submit a NEW transaction is created
      name: transactionIn.value,
      amount: amountIn.value,
      id: Date.now(),
      balance:parseFloat(amountIn.value),

    };



    this.props.addNewTransaction(transaction); //Sends the new transaction created to App.addNewTransaction with 'transaction' as the argument
    // console.log("unique ID for this transaction: ", transaction.id);
    // console.log("current Debit: ", transaction.debit);
    // console.log("current credit: ", transaction.credit);
  },

  render() {
    return (
    <form action="" id="transForm" className="col-xs-12" onSubmit={this.submitForm}>
        <div className="form-group row" id="inputsGroup">
          <label htmlFor="transactionIn">image</label>
          <input type="text" name="hi" ref="transactionIn" id="transactionIn" />
          <label htmlFor="priceIn">movie</label>
          <input type="text"  ref="amountIn" step="0.01" id="amountIn" />
      </div>
      <div className="form-group  row" id="radioGroup">
        </div>
        <button className="btn btn-primary btn-md">Add</button>
    </form>
    )
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
