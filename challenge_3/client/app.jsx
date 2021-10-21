class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            name: '',
            email: '',
            password: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
            cardNumber: '',
            expiryDate: '',
            billingZipcode: ''
        };
        // bind handlers
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick() {
        if (this.state.page === 4) {
            this.setState({
                page: 0,
                name: '',
                email: '',
                password: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                cardNumber: '',
                expiryDate: '',
                billingZipcode: ''
            })
        } else {
            this.setState((prevState) => ({
                page: prevState.page + 1
            }))
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }
    // create if/else condition to see what page we should render?
    render() {
        let renderedPage;

        if (this.state.page === 0) renderedPage = <Homepage handleClick={this.handleClick} />;
        else if (this.state.page === 1) renderedPage = <Account onChange={this.handleChange} handleClick={this.handleClick}/>;
        else if (this.state.page === 2) renderedPage = <Info onChange={this.handleChange} handleClick={this.handleClick} />;
        else if (this.state.page === 3) renderedPage = <Payment onChange={this.handleChange} handleClick={this.handleClick} />;
        else if (this.state.page === 4) renderedPage = <Data user={this.state} onChange={this.handleChange} handleClick={this.handleClick} />;
        
        return renderedPage;
    }
}
ReactDOM.render(<App />, document.getElementById("app"));

// homepage of app should have a checkout button
function Homepage(props) {
    return (
        <div>
            <h2>Checkout cart</h2>
            <button onClick={props.handleClick}>Checkout</button>
        </div>
    )
}

// F1 collects name, email, and password for account creation.
function Account(props) {
    return (
        <div>
            <h2>Create your account</h2>
            <form>
                <label>Name:
                    <input type="text" name="name" onChange={props.handleChange} />
                </label>
                <br/>
                <label>Email:
                    <input type="text" name="email" onChange={props.handleChange} />
                </label>
                <br/>
                <label>Password:
                    <input type="text" name="password" onChange={props.handleChange} />
                </label>
                <br/>
                <input type="button" value="Next" onClick={props.handleClick} />
            </form>
        </div>
    )
}
// F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
function Info(props) {
    return (
        <div>
            <h2>Enter shipping information:</h2>
            <form>
                <label>Address #1:
                    <input type="text" name="address1" onChange={props.handleChange} />
                </label>
                <br/>
                <label>Address #2:
                    <input type="text" name="address2" onChange={props.handleChange} />
                </label>
                <br/>
                <label>City:
                    <input type="text" name="city" onChange={props.handleChange} />
                </label>
                <br/>
                <label>State:
                    <input type="text" name="state" onChange={props.handleChange} />
                </label>
                <br/>
                <label>Zip code: 
                    <input type="text" name="zipCode" onChange={props.handleChange} />
                </label>
                <br/>
                <label>Phone number:
                    <input type="text" name="phone" onChange={props.handleChange} />
                </label>
                <br/>
                <input type="button" value="Next" onClick={props.handleClick} />
            </form>
        </div>
    )
}
// F3 collects credit card #, expiry date, CVV, and billing zip code.
function Payment(props) {
    return (
        <div>
            <h2>Enter payment:</h2>
            <form>
                <label>Credit Card #:
                    <input type="text" name="cardNumber" onChange={props.handleChange}/>
                </label>
                <br/>
                <label>expiry date: 
                    <input type="text" name="expiryDate" onChange={props.handleChange}/>
                </label>
                <br/>
                <label>CVV:
                    <input type="text" name="cvv" onChange={props.handleChange}/>
                </label>
                <br/>
                <label>Billing zip code:
                    <input type="text" name="billingZipcode" onChange={props.handleChange}/>
                </label>
                <br/>
                <input type="button" value="Next" onClick={props.handleClick}/>
            </form>
        </div>
    )
}

function Data(props) {
     handleClick = () => {
        let user = props.user;
        let userData = [
            user.name, 
            user.email, 
            user.password, 
            user.address1, 
            user.address2, 
            user.city,
            user.state, 
            user.zipCode, 
            user.phone, 
            user.cardNumber, 
            user.expiryDate, 
            user.billingZipcode
        ];
        $.ajax({
            url: 'http://localhost:8080/customer',
            method: 'POST',
            data: JSON.stringify({userData}),
            contentType: 'application/json',
            error: function(err) {
                console.log(err);
            },
            success: function(data) {
                console.log('Successful POST request', data)
            }
        });
        props.handleClick();
    }
    return (
        <div>
            <h2>Review Information</h2>
            <h3>Once Reviewed, click Purchase</h3>
            <table>
                <thead><tr><th colSpan="1">Account</th></tr></thead>
                <tbody>
                    <tr><td>Name</td><td>{props.user.name}</td></tr>
                    <tr><td>Email</td><td>{props.user.email}</td></tr>
                </tbody>

                <thead><tr><th colSpan="1">Shipping</th></tr></thead>
                <tbody>
                    <tr><td>Address 1</td><td>{props.user.address1}</td></tr>
                    <tr><td>Address 2</td><td>{props.user.address2}</td></tr>
                    <tr><td>City</td><td>{props.user.city}</td></tr>
                    <tr><td>State</td><td>{props.user.state}</td></tr>
                    <tr><td>Zipcode</td><td>{props.user.zipCode}</td></tr>
                    <tr><td>Phone</td><td>{props.user.phone}</td></tr>
                </tbody>

                <thead><tr><th colSpan="1">Billing</th></tr></thead>
                <tbody>
                    <tr><td>Credit Card</td><td>{props.user.cardNumber}</td></tr>
                    <tr><td>Expiration</td><td>{props.user.expiryDate}</td></tr>
                    <tr><td>Billing zipcode</td><td>{props.user.billingZipCode}</td></tr>
                </tbody>
            </table>
            <input type="button" value="Purchase" onClick={props.handleClick}/>
        </div>
    )
}