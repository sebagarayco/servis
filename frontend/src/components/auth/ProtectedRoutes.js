import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { connect } from "react-redux"

const ProtectedRoutes = ({ auth }) => {
	// TODO: Handle comments
	console.log('ProtectedRoutes: ', auth)
	return (
		auth.isAuthenticated && auth.token != null ? <Outlet /> : <Navigate to='/login' />
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoutes);