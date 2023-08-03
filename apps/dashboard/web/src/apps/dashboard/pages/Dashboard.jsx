import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { history } from "@/util/history";
import Store from "../store";
import homeFunctions from "./home/module";
import { useEffect } from "react";
import { Frame, Toast } from "@shopify/polaris";
import "./dashboard.css"

function Dashboard() {

    history.location = useLocation();
    history.navigate = useNavigate();

    const setAllCollections = Store(state => state.setAllCollections)
    const fetchAllCollections = async () => {
        let apiCollections = await homeFunctions.getAllCollections()
        setAllCollections(apiCollections)
    }
    useEffect(() => {
        fetchAllCollections()
    }, [])

    const toastConfig = Store(state => state.toastConfig)
    const setToastConfig = Store(state => state.setToastConfig)

    const disableToast = () => {
        setToastConfig({
            isActive: false,
            isError: false,
            message: ""
        })
    }

    const toastMarkup = toastConfig.isActive ? (
        <Toast content={toastConfig.message} error={toastConfig.isError} onDismiss={disableToast} duration={4000} />
    ) : null;

    return (
        <div className="dashboard">
        <Frame>
            <Outlet />
            {toastMarkup}
        </Frame>
        </div>
    )
}

export default Dashboard