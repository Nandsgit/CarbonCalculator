import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from "./components/navbar.component";
import Form from "./components/form.component";
import Community from "./components/Community.component";
import Feedback from "./components/Feedback.component";
import UserSignUp from "./components/user-sign-up.component";
import UserSignIn from "./components/user-sign-in.component";
import MyProfile from "./components/myProfile.component";
import UserLogout from "./components/user-logout.component";
import Homepage from "./components/homepage.component";
import Form_Result from './components/form_result.component';
import SurveyResult from "./components/SurveyResult.component";
import Vehicle_Emission from './components/home/pages/vehiclesemission';
import Energy_Emission from './components/home/pages/energyemission';
import Food_Emission from './components/home/pages/foodemission';
import Deforestation from './components/home/pages/deforestation';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="container">
                    <Navbar />
                    <Route path="/form" component={Form} />
                    <Route path="/community" component={Community} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/form_result" component={Form_Result} />
                    <Route path="/user/myProfile" component={MyProfile} />
                    <Route path="/user/logout" component={UserLogout} />
                    <Route path="/vehicle_emission" component={Vehicle_Emission} />
                    <Route path="/energy_emission" component={Energy_Emission} />
                    <Route path="/food_emission" component={Food_Emission} />
                    <Route path="/deforestation" component={Deforestation} />
                    <Route path="/survey" component={SurveyResult} />
                    <Route exact path="/" component ={Homepage} />
                </div>
                <Route path="/user/sign_up" component={UserSignUp} />
                <Route path="/user/sign_in" component={UserSignIn} />
            </Router>
        </div>
    );
}

export default App;
