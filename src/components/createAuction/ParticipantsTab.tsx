import { useState } from "react"
import { Button, CloseButton, ListGroup, ListGroupItem, Form} from "react-bootstrap"
import IconPlus from "../common/IconPlus"

export type ParticipantsTabProps = {
  participants: string[]
  handleAddParticipant: (email: string) => void
  handleRemoveParticipant: (email: string) => void
}

export const ParticipantsTab = ({ participants, handleRemoveParticipant, handleAddParticipant }: ParticipantsTabProps): React.JSX.Element => {

  const [email, setEmail] = useState("");


  return <>
    <div className="d-flex w-100  justify-content-center align-items-center mb-4">
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse email de l'invité"
      />
      <Button
        onClick={() => { handleAddParticipant(email); setEmail("") }}
        variant={"outline-primary"}
        className="ms-2"
      >
        <IconPlus color="#5575c8" />
      </Button>
    </div>

    <ListGroup className="mb-0">
      {participants && participants.map((participant, index) => (
        <ListGroupItem
          key={index}
          className=" d-flex align-items-center justify-content-between border-0 mb-2 rounded"
          style={{ backgroundColor: "#f4f6f7" }}
        >
          {participant}
          <CloseButton
            onClick={() =>
              handleRemoveParticipant(participant)
            }
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  </>
}
