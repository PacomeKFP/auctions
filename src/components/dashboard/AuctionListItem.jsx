import { Card, Badge, Stack } from "react-bootstrap";
import { PropTypes } from "prop-types";
export default function AuctionListItem({ auction, userMail }) {
  const getBgColor = (status) => {
    switch (status) {
      case "PENDING":
        return "info";
      case "IN_PROGRESS":
        return "warning";
      case "COMPLETED":
        return "success";
      default:
        return "danger";
    }
  };
  const isAdmin = (auction, userMail) =>
    auction.admin.email.trim() === String(userMail).trim();
  return (
    <Card className="w-20 transition">
      <Card.Header className="fw-bold">{auction.name}</Card.Header>
      <Card.Body>
        <ul>
          <li>
            <span className="fw-bold">Description : </span>
            {auction.description}
          </li>
          <li>
            <span className="fw-bold">Articles : </span>
            <ol>
              {auction.lots.map((lot, index) => (
                <li key={index}>{lot}</li>
              ))}
            </ol>
          </li>
          <li>
            <span className="fw-bold">Nombre de participants : </span>
            {auction.participants.length}
          </li>
          <li>
            <span className="fw-bold">admin : </span>
            {auction.admin.email}
          </li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={3}>
          <Badge pill bg={getBgColor(auction.status)}>
            {auction.status}
          </Badge>
          <Badge bg="info" pill>
            {isAdmin(auction, userMail) ? "Admin" : ""}
          </Badge>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

AuctionListItem.propTypes = {
  auction: PropTypes.any,
  userMail: PropTypes.any,
};
