import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Chat from './pages/Chat';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user && (!roles || roles.includes(user.role)) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/member-dashboard" component={MemberDashboard} roles={['member']} />
              <PrivateRoute path="/admin-dashboard" component={AdminDashboard} roles={['admin', 'secretary', 'chairman', 'treasurer']} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/reports" component={Reports} roles={['admin', 'secretary', 'chairman', 'treasurer']} />
              <PrivateRoute path="/chat" component={Chat} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

