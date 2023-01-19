import { useDispatch, useSelector } from "react-redux"
import {
	cleanArticle,
	cleanMessage,
	emptyData,
	fetchArticle,
	fetchArticlePage,
	sendArticleReport,
	sendComment,
	sendReaction,
	sendSurvey,
	setArticlesUnread,
} from "../reducers/articleReducer"

export default function useArticle() {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.articles.data)
	const pagination = useSelector((state) => state.articles.pagination)
	const detail = useSelector((state) => state.articles.detail)
	const defaultSize = useSelector((state) => state.articles.defaultSize)
	const message = useSelector((state) => state.articles.message)
	const loading = useSelector((state) => state.articles.loading)
	const secondLoading = useSelector((state) => state.articles.secondLoading)
	const stopFetching = useSelector((state) => state.articles.stopFetching)
	const unread = useSelector((state) => state.articles.unread)

	const fetchArticles = async (perPage, pageNumber, filterData, loading, secondLoading) => {
		dispatch(fetchArticlePage(perPage, pageNumber, filterData, loading, secondLoading))
	}

	const fetchOne = async (id, loading) => {
		return dispatch(fetchArticle(id, loading))
	}

	const cleanToast = async () => {
		dispatch(cleanMessage())
	}

	const cleanDetail = async () => {
		dispatch(cleanArticle())
	}

	const cleanData = async () => {
		dispatch(emptyData())
	}

	const postReaction = async (reaction, articleId) => {
		const payload = {
			reaction: reaction,
			article: articleId,
		}
		return dispatch(sendReaction(payload))
	}

	const postComment = async (articleId, comment) => {
		const payload = {
			article: articleId,
			comment: comment,
		}

		return dispatch(sendComment(payload))
	}

	const postSurvey = async (payload) => {
		return dispatch(sendSurvey(payload)).then(() => fetchOne(detail.unique_url))
	}

	const postArticleReport = async (payload) => {
		return dispatch(sendArticleReport(payload))
	}

	const setUnread = async (payload) => {
		dispatch(setArticlesUnread(payload))
	}

	return {
		data,
		loading,
		message,
		detail,
		pagination,
		defaultSize,
		secondLoading,
		stopFetching,
		unread,
		fetchArticles,
		cleanToast,
		fetchOne,
		cleanDetail,
		cleanData,
		postSurvey,
		postReaction,
		postComment,
		postArticleReport,
		setUnread,
	}
}
