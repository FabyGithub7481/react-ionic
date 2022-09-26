import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, pencil, close, people } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { removeCustomer, saveCustomer, searchCustomers } from "./CustomerApi";

const CustomerList: React.FC = () => {
  const [clientes, setClientes] = useState<any>([]);
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    let result = searchCustomers();
    setClientes(result);
  };

  const remove = (id: string) => {
    removeCustomer(id);
    search();
  };
  const pruebaLocalStorage = () => {
    const ejemplo = {
      id: "1",
      firstName: "John",
      lastName: "Ray",
      email: "jhon@mail.com",
      phone: "54545465465",
      address: "Avenida siempre viva 123",
    };
    saveCustomer(ejemplo);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonTitle>Gestión de Clientes</IonTitle>

            <IonItem>
              <IonButton color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Agregar Cliente
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Teléfono</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>
              {clientes.map((cliente: any) => (
                <IonRow key={cliente.id}>
                  <IonCol>
                    {cliente.firstName} {cliente.lastName}
                  </IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>

                  <IonCol>
                    <IonButton color="primary" fill="clear">
                      <div className="edit-icon">
                        <IonIcon icon={pencil} slot="icon-only" />
                      </div>
                    </IonButton>

                    <IonButton color="danger" fill="clear"
                    onClick={()=> remove(cliente.id)}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
          <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
            <IonIcon icon={people} slot="icon-only" />
            Prueba LocalStorage
          </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
