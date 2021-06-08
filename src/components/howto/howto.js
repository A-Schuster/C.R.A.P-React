import { useDispatch } from "react-redux"
import { postUserIssue } from "../../redux/ActionCreator"

const HowTo = () => {
  const dispatch = useDispatch()
  const user = ({
    username: "aSchuster",
    id: 1,
    issues: ['t','g']
  })
  const issue = ({
    firstName: 'taco'
  })
  dispatch(postUserIssue(user,issue))
  return(
    <div>You are on How-To</div>
  )
}

export default HowTo