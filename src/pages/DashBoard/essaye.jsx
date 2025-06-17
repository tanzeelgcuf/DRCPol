import React, { useState } from "react"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch"; 
import Image from "next/image"; 
import dynamic from "next/dynamic";
import jsPDF from "jspdf";

const Map = dynamic(() => import("react-map-gl").then(mod => mod.Map), { ssr: false });

export default function PoliceSearchInterface() { const [searchParams, setSearchParams] = useState({ name: "", firstName: "", dateOfBirth: "", nationalID: "", facialRecognition: false, fingerprintMatch: false, showWarrants: false, }); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false);

const handleSearch = async () => { setLoading(true); setTimeout(() => { setResults([ { id: 1, name: "Doe", firstName: "John", dateOfBirth: "1990-01-01", nationalID: "1234567890", criminalRecord: "Aucun antécédent", hasWarrant: searchParams.showWarrants ? "Oui" : "Non", biometrics: ${searchParams.facialRecognition ? 'Face Match' : ''} ${searchParams.fingerprintMatch ? 'Fingerprint Match' : ''}, photoUrl: "https://via.placeholder.com/100", lastLocation: "Kinshasa - Gombe, Avenue des Huileries", coordinates: { lat: -4.32245, lng: 15.30705 }, vehicles: ["Toyota Corolla - AA123BC", "Yamaha Scooter - BB456CD"], properties: ["Appartement - Av. des Manguiers, Kinshasa", "Terrain - Matete"], movements: [ { date: "2025-04-01", location: "Gombe" }, { date: "2025-03-29", location: "Kintambo" }, { date: "2025-03-25", location: "Ngaliema" }, ] }, ]); setLoading(false); }, 1500); };

const generatePDF = (person, save = false) => { const doc = new jsPDF(); doc.text("Rapport de recherche de personne", 10, 10); doc.text(Nom: ${person.name}, 10, 20); doc.text(Prénom: ${person.firstName}, 10, 30); doc.text(Date de naissance: ${person.dateOfBirth}, 10, 40); doc.text(ID National: ${person.nationalID}, 10, 50); doc.text(Casier judiciaire: ${person.criminalRecord}, 10, 60); doc.text(Mandat en cours: ${person.hasWarrant}, 10, 70); doc.text(Biométrie: ${person.biometrics}, 10, 80); doc.text(Dernière localisation: ${person.lastLocation}, 10, 90); const fileName = rapport_${person.name}_${person.firstName}.pdf; if (save) { doc.save(/secured_folder/${fileName}); // Simulation de dossier sécurisé } else { doc.save(fileName); } };

const sendEmail = (person) => { alert(Un email avec le rapport de ${person.firstName} ${person.name} a été envoyé.); // Intégration API SMTP ou serveur backend nécessaire ici };

return ( <div className="p-6 space-y-6"> <Card> <CardContent className="space-y-4 pt-4"> <h2 className="text-xl font-semibold">Recherche de personne</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <Input placeholder="Nom" value={searchParams.name} onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })} /> <Input placeholder="Prénom" value={searchParams.firstName} onChange={(e) => setSearchParams({ ...searchParams, firstName: e.target.value })} /> <Input type="date" placeholder="Date de naissance" value={searchParams.dateOfBirth} onChange={(e) => setSearchParams({ ...searchParams, dateOfBirth: e.target.value })} /> <Input placeholder="Numéro d'identité nationale" value={searchParams.nationalID} onChange={(e) => setSearchParams({ ...searchParams, nationalID: e.target.value })} /> </div> <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"> <div className="flex items-center space-x-2"> <Switch checked={searchParams.facialRecognition} onCheckedChange={(checked) => setSearchParams({ ...searchParams, facialRecognition: checked })} /> <span>Reconnaissance faciale</span> </div> <div className="flex items-center space-x-2"> <Switch checked={searchParams.fingerprintMatch} onCheckedChange={(checked) => setSearchParams({ ...searchParams, fingerprintMatch: checked })} /> <span>Empreintes digitales</span> </div> <div className="flex items-center space-x-2"> <Switch checked={searchParams.showWarrants} onCheckedChange={(checked) => setSearchParams({ ...searchParams, showWarrants: checked })} /> <span>Afficher les mandats</span> </div> </div> <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto mt-4"> {loading ? "Recherche en cours..." : "Rechercher"} </Button> </CardContent> </Card>

{results.length > 0 && (
    <Card>
      <CardContent className="pt-4 space-y-6">
        <h3 className="text-lg font-medium mb-4">Résultats</h3>
        {results.map((person) => (
          <div key={person.id} className="space-y-4">
            <div className="flex items-center space-x-6">
              <Image
                src={person.photoUrl}
                alt="Photo de la personne"
                width={100}
                height={100}
                className="rounded border"
              />
              <div>
                <p><strong>Nom :</strong> {person.name}</p>
                <p><strong>Prénom :</strong> {person.firstName}</p>
                <p><strong>Date de naissance :</strong> {person.dateOfBirth}</p>
                <p><strong>Numéro ID :</strong> {person.nationalID}</p>
                <p><strong>Casier judiciaire :</strong> {person.criminalRecord}</p>
                <p><strong>Mandat en cours :</strong> {person.hasWarrant}</p>
                <p><strong>Biométrie :</strong> {person.biometrics}</p>
                <p><strong>Dernière localisation connue :</strong> {person.lastLocation}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => generatePDF(person)}>Télécharger le PDF</Button>
              <Button onClick={() => generatePDF(person, true)}>Enregistrer dans un dossier sécurisé</Button>
              <Button onClick={() => sendEmail(person)}>Envoyer par Email</Button>
            </div>
            <div className="h-64 rounded overflow-hidden">
              <Map
                initialViewState={{
                  longitude: person.coordinates.lng,
                  latitude: person.coordinates.lat,
                  zoom: 14
                }}
                mapboxAccessToken="YOUR_MAPBOX_TOKEN"
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              />
            </div>
            <div>
              <h4 className="font-semibold">Déplacements récents</h4>
              <ul className="list-disc list-inside">
                {person.movements.map((move, idx) => (
                  <li key={idx}>{move.date} - {move.location}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Véhicules enregistrés</h4>
                <ul className="list-disc list-inside">
                  {person.vehicles.map((vehicle, idx) => (
                    <li key={idx}>{vehicle}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Biens immobiliers</h4>
                <ul className="list-disc list-inside">
                  {person.properties.map((property, idx) => (
                    <li key={idx}>{property}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )}
</div>

); }