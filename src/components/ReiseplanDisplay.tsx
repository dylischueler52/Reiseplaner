import type { Reise } from "../models/Reiseplaner";

type Props = {
  data: Reise[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

export function ReiseDisplay(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ziel</th>
          <th>Dauer</th>
          <th>Level</th>
          <th>Zweck</th>
          <th>Jahreszeit</th>
          <th>Wichtig</th>
          <th>Aktionen</th>
        </tr>
      </thead>

      <tbody>
        {props.data.map((reise) => (
          <tr key={reise.id}>
            <td>{reise.name}</td>
            <td>{reise.ziel}</td>
            <td>{reise.dauer}</td>
            <td>{reise.abenteuerlevel}</td>
            <td>{reise.zweck}</td>
            <td>{reise.jahreszeit}</td>
            <td>
              <button onClick={() => props.onUpdate(reise.id)}>Edit</button>
              <button onClick={() => props.onDelete(reise.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}