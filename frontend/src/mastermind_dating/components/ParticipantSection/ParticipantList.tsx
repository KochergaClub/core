import { MastermindDatingParticipantFragment as Participant } from '../../queries.generated';
import ParticipantCard from './ParticipantCard';

interface Props {
  participants: Participant[];
}

const ParticipantList: React.FC<Props> = ({ participants }) => {
  return (
    <div className="flex flex-wrap space-x-4">
      {participants.map((participant) => (
        <ParticipantCard key={participant.id} participant={participant} />
      ))}
    </div>
  );
};

export default ParticipantList;
