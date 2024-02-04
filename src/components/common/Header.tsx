import { Link } from "react-router-dom"
import { ActionButton } from "../../interfaces/global"

export type HeaderProps = {
  title: string,
  actions: ActionButton[]
}

export const Header = ({ title, actions }: HeaderProps): React.JSX.Element => {
  return <div id="dashboard-header">
    <h2 className="app-name"> {title}</h2>
    <div className="settings">
      {actions.map((action, index) =>
        <Link key={index} className="new-auction link me-3" to={`${action.path}`}>
          <span className={`text btn btn-outline-${action.color}`}>
            &nbsp; {action.label}
          </span>
        </Link>
      )}
    </div>
  </div>
}
