import {
  Eventcalendar,
  snackbar,
  Popup,
  Button,
  Input,
  Textarea,
  Switch,
  Datepicker,
  SegmentedGroup,
  SegmentedItem,
  MbscCalendarEvent,
  MbscEventcalendarView, setOptions,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import React from "react";
import { MbscResource } from "@mobiscroll/react";

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const now = new Date();
const day = now.getDay();
const monday = now.getDate() - day + (day == 0 ? -6 : 1);

const defaultEvents = [
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 1, 11),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 1, 12, 30),
    title: "Product team mtg.",
    resource: 1,
  },
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 15),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 17),
    title: "Decision Making mtg.",
    resource: 1,
  },
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 2, 12),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 2, 15, 30),
    title: "Shaping the Future",
    resource: 2,
  },
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 9),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 12),
    title: "Innovation mtg.",
    resource: 3,
  },
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 11),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 16),
    title: "Decision Making mtg.",
    resource: 4,
  },
  {
    start: new Date(now.getFullYear(), now.getMonth(), monday + 3, 11),
    end: new Date(now.getFullYear(), now.getMonth(), monday + 3, 13),
    title: "Stakeholder mtg.",
    resource: 5,
  },
];

export default function Calendar() {
  const viewSettings = React.useMemo<MbscEventcalendarView>(() => {
    return {
      schedule: {
        type: "week",
        allDay: false,
        startDay: 1,
        endDay: 5,
        startTime: "08:00",
        endTime: "20:00",
      },
    };
  }, []);

  const myResources = React.useMemo<MbscResource[]>(() => {
    return [
      {
        id: 1,
        name: "Flatiron Room",
        color: "#f7c4b4",
      },
      {
        id: 2,
        name: "The Capital City (locked)",
        color: "#c6f1c9",
      },
      {
        id: 3,
        name: "Heroes Square",
        color: "#e8d0ef",
      },
      {
        id: 4,
        name: "Thunderdome",
        color: "#edeaba",
      },
      {
        id: 5,
        name: "King’s Landing",
        color: "#bacded",
      },
    ];
  }, []);

  const [myEvents, setMyEvents] =
    React.useState<MbscCalendarEvent[]>(defaultEvents);

  const [tempEvent, setTempEvent] = React.useState<any>(null);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<any>(null);
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);
  const [popupEventTitle, setTitle] = React.useState<string | undefined>("");
  const [popupEventDescription, setDescription] = React.useState<string>("");
  const [popupEventAllDay, setAllDay] = React.useState<boolean>(true);
  const [popupEventDate, setDate] = React.useState<any>([]);
  const [popupEventStatus, setStatus] = React.useState<string>("busy");
  const [mySelectedDate, setSelectedDate] = React.useState<any>(new Date());
  const saveEvent = React.useCallback<any>(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
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
      console.log("new event", newEvent);
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
    popupEventAllDay,
    popupEventDate,
    popupEventDescription,
    popupEventStatus,
    popupEventTitle,
    tempEvent,
    // popupResource
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
          message: "Event deleted",
        });
      });
    },
    [myEvents],
  );

  const loadPopupForm = React.useCallback((event: MbscCalendarEvent) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    setStatus(event.status || "busy");
  }, []);

  // handle popup form changes

  const titleChange = React.useCallback<any>((ev: any) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = React.useCallback<any>((ev: any) => {
    setDescription(ev.target.value);
  }, []);

  const allDayChange = React.useCallback<any>((ev: any) => {
    setAllDay(ev.target.checked);
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

  const onEventUpdated = React.useCallback<any>((event: any) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // ...
  }, []);

  // datepicker options
  const controls = React.useMemo<any>(
    () => (popupEventAllDay ? ["date"] : ["datetime"]),
    [popupEventAllDay],
  );
  const headerText = React.useMemo<string>(
    () => (isEdit ? "Edit event" : "New Event"),
    [isEdit],
  );
  const respSetting = React.useMemo<any>(
    () =>
      popupEventAllDay
        ? {
            medium: {
              controls: ["calendar"],
              touchUi: false,
            },
          }
        : {
            medium: {
              controls: ["calendar", "time"],
              touchUi: false,
            },
          },
    [popupEventAllDay],
  );
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
          <Input label="Title" value={popupEventTitle} onChange={titleChange} />
          <Textarea
            label="Description"
            value={popupEventDescription}
            onChange={descriptionChange}
          />
        </div>
        <div className="mbsc-form-group">
          <Switch
            label="All-day"
            checked={popupEventAllDay}
            onChange={allDayChange}
          />
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
            <SegmentedItem value="busy" checked={popupEventStatus === "busy"}>
              Show as busy
            </SegmentedItem>
            <SegmentedItem value="free" checked={popupEventStatus === "free"}>
              Show as free
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
                Delete event
              </Button>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
}
