import {
  Eventcalendar,
  snackbar,
  Popup,
  Button,
  Input,
  Datepicker,
  SegmentedGroup,
  SegmentedItem,
  MbscCalendarEvent,
  MbscEventcalendarView,
  setOptions,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import React, { useEffect, useState } from "react";
import { MbscResource } from "@mobiscroll/react";
import useAppointmentsStore from "@/store/appointments/appointmentsStore.ts";
import appointmentsFromAlgo from "@/store/appointments/appointmentsFromAlgo.ts";
import AppointmentType from "@/store/appointments/appointmentType.ts";
import getSerializedAppointments from "@/store/appointments/serializer.ts";
// import appointmentsFromAlgo from "@/store/appointments/appointmentsFromAlgo.ts";


const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

setOptions({
  theme: "ios",
  themeVariant: "light",
});
const now = new Date();
const day = now.getDay();
const monday = now.getDate() - day + (day == 0 ? -6 : 1);
const defaultEvents = [
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 1, 11),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 1, 12, 30),
    title: "John Doe",
    resource: "TB1",
    id: "appointment-1",
    taj: "asdasd",
  },
];
//   {
//     start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 15),
//     end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 17),
//     title: "Henry Smith",
//     resource: "TB2",
//     id: "appointment-2",
//   },
//   {
//     start: new Date(now.getFullYear(), now.getMonth(), monday + 2, 12),
//     end: new Date(now.getFullYear(), now.getMonth(), monday + 2, 15, 30),
//     title: "Viktor Nagy",
//     resource: "VB1",
//     id: "appointment-3",
//   },
//   {
//     start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 9),
//     end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 12),
//     title: "Alexandra Molnar",
//     resource: "VB2",
//     id: "appointment-4",
//   },
//   {
//     start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 11),
//     end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 16),
//     title: "Peter Kovacs",
//     resource: "U",
//     id: "appointment-5",
//   },
//   {
//     start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 11),
//     end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 13),
//     title: "Stakeholder mtg.",
//     resource: "TB2",
//     id: "event-6",
//   },
// ];

export default function Scheduler() {
  const appointments = useAppointmentsStore((state) => state.appointments);
  const [appointmentsFromAlgoState, setAppointmentsFromAlgoState] = useState<
    AppointmentType[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      getSerializedAppointments().then((res: AppointmentType[]) => {
        setAppointmentsFromAlgoState(res);
        console.log(res)
      });
    };
    fetchData();
  }, []);

  const viewSettings = React.useMemo<MbscEventcalendarView>(() => {
    return {
      schedule: {
        type: "week",
        startDay: 1,
        endDay: 5,
        startTime: "08:00",
        endTime: "20:00",
        allDay: false,
      },
    };
  }, []);

  const myResources = React.useMemo<MbscResource[]>(() => {
    return [
      {
        id: "TB1",
        name: "TrueBeam 1 (TB1)",
        color: "#f7c4b4",
      },
      {
        id: "TB2",
        name: "TrueBeam 2 (TB2)",
        color: "#c6f1c9",
      },
      {
        id: "VB1",
        name: "VitalBeam 1 (VB1)",
        color: "#e8d0ef",
      },
      {
        id: "VB2",
        name: "VitalBeam 2 (VB2)",
        color: "#edeaba",
      },
      {
        id: "U",
        name: "Unique",
        color: "#bacded",
      },
    ];
  }, []);

  const [myEvents, setMyEvents] = React.useState<MbscCalendarEvent[]>(
    // appointments,
    // defaultEvents
    // [appointments[0]]
    appointmentsFromAlgoState
  );

  useEffect(() => {
    setMyEvents(appointmentsFromAlgoState);
  }, [appointmentsFromAlgoState]);
  console.log(myEvents);

  const [tempEvent, setTempEvent] = React.useState<any>(null);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<any>(null);
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);

  const [popupEventFullname, setFullname] = React.useState<string | undefined>(
    "",
  );
  const [popupEventTajNumber, setTajNumber] = React.useState<string>("");
  const [popupEventRegion, setRegion] = React.useState<string>("");

  const [popupEventDate, setDate] = React.useState<any>([]);
  const [popupEventStatus, setStatus] = React.useState<string>("notify");
  const [mySelectedDate, setSelectedDate] = React.useState<any>(new Date());
  const saveEvent = React.useCallback<any>(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventFullname,
      tajNumber: popupEventTajNumber,
      region: popupEventRegion,
      start: popupEventDate[0],
      allDay: false,
      end: popupEventDate[1],
      status: popupEventStatus,
      resource: tempEvent.resource,
    };
    if (isEdit) {
      // update the event in the list
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];

      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      setMyEvents([...myEvents, newEvent]);
      // here you can add the event to your storage as well
      // ...
    }
    setSelectedDate(popupEventDate[0]);
    // close the popup
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventDate,
    popupEventFullname,
    popupEventTajNumber,
    popupEventRegion,
    popupEventStatus,
    tempEvent,
  ]);

  const deleteEvent = React.useCallback(
    (event: any) => {
      const filteredEvents = myEvents.filter((item) => item.id !== event.id);
      setMyEvents(filteredEvents);
      setTimeout(() => {
        snackbar({
          button: {
            action: () => {
              setMyEvents([...filteredEvents, event]);
            },
            text: "Undo",
          },
          message: "Appointment deleted",
        });
      });
    },
    [myEvents],
  );

  const loadPopupForm = React.useCallback((event: MbscCalendarEvent) => {
    setFullname(event.title);
    setTajNumber(event.tajNumber);
    setRegion(event.region);
    setDate([event.start, event.end]);
    setStatus(event.status || "notify");
  }, []);

  // handle popup form changes

  const fullnameChange = React.useCallback<any>((ev: any) => {
    setFullname(ev.target.value);
  }, []);

  const tajNumberChange = React.useCallback<any>((ev: any) => {
    setTajNumber(ev.target.value);
  }, []);

  const regionChange = React.useCallback<any>((ev: any) => {
    setRegion(ev.target.value);
  }, []);

  const dateChange = React.useCallback<any>((args: any) => {
    setDate(args.value);
  }, []);

  const statusChange = React.useCallback<any>((ev: any) => {
    setStatus(ev.target.value);
  }, []);

  const onDeleteClick = React.useCallback<any>(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  // scheduler options

  const onSelectedDateChange = React.useCallback<any>((event: any) => {
    setSelectedDate(event.date);
  }, []);

  const onEventClick = React.useCallback<any>(
    (args: any) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm],
  );

  const onEventCreated = React.useCallback<any>(
    (args: any) => {
      setEdit(false);
      setTempEvent(args.event);
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.target);
      // open the popup
      setOpen(true);
    },
    [loadPopupForm],
  );

  const onEventDeleted = React.useCallback<any>(
    (args: any) => {
      deleteEvent(args.event);
    },
    [deleteEvent],
  );

  const onEventUpdated = React.useCallback<any>(() => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // ...
  }, []);

  // datepicker options
  const controls = React.useMemo<any>(() => ["datetime"], []);

  const headerText = React.useMemo<string>(
    () => (isEdit ? "Edit appointment" : "New appointment"),
    [isEdit],
  );
  const respSetting = {
    medium: {
      controls: ["calendar", "time"],
      touchUi: false,
    },
  };
  const popupButtons = React.useMemo<any>(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onClose = React.useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setOpen(false);
  }, [isEdit, myEvents]);

  function newEventData() {
    return {
      title: "New appointment",
    };
  }

  return (
    <div>
      <Eventcalendar
        view={viewSettings}
        data={myEvents}
        clickToCreate="double"
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        selectedDate={mySelectedDate}
        resources={myResources}
        onSelectedDateChange={onSelectedDateChange}
        onEventClick={onEventClick}
        onEventCreated={onEventCreated}
        onEventDeleted={onEventDeleted}
        onEventUpdated={onEventUpdated}
        height={1500}
        width={1500}
        extendDefaultEvent={newEventData}
        renderScheduleEventContent={(event) => {
          // @ts-ignore
          return (
            <div className="custom-event-content">
              <div className="event-title">{event.title}</div>
              <div className="font-normal">{event.original.region}</div>
            </div>
          );
        }}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isOpen}
        onClose={onClose}
        responsive={responsivePopup}
      >
        <div className="mbsc-form-group">
          <Input
            label="Full name"
            value={
              popupEventFullname === "New appointment" ? "" : popupEventFullname
            }
            onChange={fullnameChange}
          />
          <Input
            label="Taj Number"
            value={popupEventTajNumber}
            onChange={tajNumberChange}
          />
          <Input
            label="Region"
            value={popupEventRegion}
            onChange={regionChange}
          />
        </div>
        <div className="mbsc-form-group">
          <Input ref={startRef} label="Starts" />
          <Input ref={endRef} label="Ends" />
          <Datepicker
            select="range"
            controls={controls}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            responsive={respSetting}
            onChange={dateChange}
            value={popupEventDate}
          />
          <SegmentedGroup onChange={statusChange}>
            <SegmentedItem
              value="notify"
              checked={popupEventStatus === "notify"}
            >
              Notify patient
            </SegmentedItem>
            <SegmentedItem
              value="dont-notify"
              checked={popupEventStatus === "dont-notify"}
            >
              Don't notify
            </SegmentedItem>
          </SegmentedGroup>
          {isEdit && (
            <div className="mbsc-button-group">
              <Button
                className="mbsc-button-block"
                color="danger"
                variant="outline"
                onClick={onDeleteClick}
              >
                Delete appointment
              </Button>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
}
