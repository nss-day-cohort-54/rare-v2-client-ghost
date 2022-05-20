import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { addSub, deleteSub, getSubsForFollower } from "./SubManager"
import { getCurrentUser } from "./UserManager"


export const SubForm = ({ author, setRefreshState, refreshState }) => {
    const [subbed, setSubbed] = useState(false)
    const [subs, setSubs] = useState([])
    const [currentSub, setCurrentSub] = useState({})
    const { currentUser } = useContext(UserContext)
    const [subRefresh, setSubRefresh] = useState(false)



    const getSubs = () => {
        getSubsForFollower(currentUser.id)
            .then(subData => setSubs(subData))
    }

    useEffect(
        () => {
            if (currentUser && currentUser.id) {
                getSubsForFollower(currentUser.id)
                    .then(subData => setSubs(subData))
            }
        }, [currentUser]
    )

    useEffect(() => {
        let isSubbed = false
        for (const sub of subs) {
            if (sub.author === author.id) {
                isSubbed = true
                setCurrentSub(sub)
            }
        }
        setSubbed(isSubbed)

    }, [subs])

    const handleSub = (e) => {
        if (subbed) {
            deleteSub(currentSub.id)
                .then(returnedSub => {
                    setCurrentSub(returnedSub)
                }).then(getSubs)

        } else {
            let userId = parseInt(currentUser.id)
            if (userId != author.id) {
                let new_subscription = {
                    author: author.id,
                }
                addSub(new_subscription)
                    .then(returnedSub => {
                        setCurrentSub(returnedSub)
                    })
                    .then(getSubs)
            } else {
                window.alert("You can't subscribe to yourself.")
            }
        }
    }

    return <div>
        {
            parseInt(currentUser) != author.id
                ? <button
                    className="subButton"
                    onClick={(e) => {
                        handleSub(e)

                    }}>
                    {subbed ? "Unsubscribe" : "Subscribe"}
                </button>
                : null
        }

    </div>
}