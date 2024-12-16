import { Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import AddSongDialog from "./AddSongDialog";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Music className='size-5 text-emerald-500' />
              Biblioteca de músicas
            </CardTitle>
            <CardDescription>Gerencie suas faixas de música</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;