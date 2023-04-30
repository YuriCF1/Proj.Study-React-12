import "./Search.css"

//Hooks react
import { useEffect } from "react"

//Hooks react router
import { Link } from "react-router-dom"

//Hooks redux
import { useDispatch, useSelector } from "react-redux"

//Custom hooks
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
import { useQuery } from "../../hooks/useQuery"

//Components
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"


const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search