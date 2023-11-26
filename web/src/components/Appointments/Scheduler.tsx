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
  Checkbox,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import React, { useEffect } from "react";
import { MbscResource } from "@mobiscroll/react";
import useAppointmentsStore from "@/store/appointments/appointmentsStore.ts";
import usePatientsStore from "@/store/patients/patientsStore.ts";

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

export default function Scheduler() {
  const state = useAppointmentsStore();

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

  const resources = React.useMemo<MbscResource[]>(() => {
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
  const [myResources, setResources] = React.useState(resources);
  const [participants, setParticipants] = React.useState<{
    [key: string]: boolean;
  }>({
    TB1: true,
    TB2: true,
    VB1: true,
    VB2: true,
    U: true,
  });
  const filter = React.useCallback(
    (ev) => {
      participants[ev.target.value] = ev.target.checked;
      setParticipants({ ...participants });
      console.log(participants);
      setResources(resources.filter((r: any) => participants[r.id]));
    },
    [participants, resources],
  );

  const [myEvents, setMyEvents] = React.useState<MbscCalendarEvent[]>(
    state.appointments,
  );

  useEffect(() => {
    setMyEvents(state.appointments);
  }, [state.appointments]);

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
    <>
      <div className="flex items-center flex-col justify-center my-12">
        <p className="text-xl mb-4">Show/hide needed machines</p>
        <div className="flex items-center">
          <Checkbox
            className="before:hidden after:hidden"
            defaultChecked={participants["TB1"]}
            onChange={filter}
            value="TB1"
            label="TrueBeam 1"
          />
          <Checkbox
            className="before:hidden after:hidden"
            defaultChecked={participants["TB2"]}
            onChange={filter}
            value="TB2"
            label="TrueBeam 2"
          />
          <Checkbox
            className="before:hidden after:hidden"
            defaultChecked={participants["VB1"]}
            onChange={filter}
            value="VB1"
            label="VitalBeam 1"
          />
          <Checkbox
            className="before:hidden after:hidden"
            defaultChecked={participants["VB2"]}
            onChange={filter}
            value="VB2"
            label="VitalBeam 2"
          />
          <Checkbox
            className="before:hidden after:hidden"
            defaultChecked={participants["U"]}
            onChange={filter}
            value="U"
            label="Unique"
          />
        </div>
      </div>
      <>
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
          height={2000}
          width={2000}
          className="px-5"
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
                popupEventFullname === "New appointment"
                  ? ""
                  : popupEventFullname
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
      </>
    </>
  );
}
