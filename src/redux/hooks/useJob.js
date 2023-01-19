import { useDispatch, useSelector } from "react-redux";
import { cleanJobDetail, emptyData, fetchBillboardPage, fetchOneJob, postJobApplication  } from "../reducers/jobReducer";

export default function useJob() {

	const dispatch = useDispatch();
	const data = useSelector((state) => state.jobs.data);
	const detail = useSelector((state) => state.jobs.detail);
	const pagination = useSelector((state) => state.jobs.pagination);
	const defaultSize = useSelector((state) => state.jobs.defaultSize);
	const message = useSelector((state) => state.jobs.message);
	const loading = useSelector((state) => state.jobs.loading);

	const fetchPage = async (perPage, pageNumber) => {
		dispatch(fetchBillboardPage(perPage, pageNumber))
	}

	const fetchOne = async (id) => {
		return dispatch(fetchOneJob(id))
	}

	const sendJobApplication = async (payload) => {
		return dispatch(postJobApplication(payload))
	}

    const cleanData = async () => {
        dispatch(emptyData())
    }

    const cleanDetail = async () => {
        dispatch(cleanJobDetail())
    }

	return {
		data, loading, message, 
		pagination, defaultSize, 
		fetchPage, sendJobApplication, fetchOne, 
        detail, cleanData, cleanDetail 
	}
}