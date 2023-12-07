import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {USER} = useSelector(state => state.user)
    console.log("protected route",USER);
    return USER ? <Outlet/> : <Navigate to='/login'/>
}