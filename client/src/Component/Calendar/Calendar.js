import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./calendar.css";
import {
  Button,
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Datepicker,
  Eventcalendar,
  getJson,
  Input,
  localeFr,
  Popup,
  SegmentedGroup,
  SegmentedItem,
  setOptions,
  snackbar,
  Textarea,
  toast,
} from '@mobiscroll/react';

const toggleTheme = () => {
  // SQL request to change the theme
  return 'light';
};

setOptions({
  locale: localeFr,
  theme: 'ios',
  themeVariant: toggleTheme,
});

const now = new Date();
const today = new Date(now.setMinutes(59));const defaultEvents = [{}]
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

async function getLocations() {
  try {
    const response = await fetch("http://localhost:5000/api/sites/all");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Erreur :", response.status);
      throw new Error("Erreur lors de la requête");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function Calendar() {
  const [view, setView] = React.useState('month');
  const [myEvents, setMyEvents] = React.useState(defaultEvents);
  const [tempEvent, setTempEvent] = React.useState(null);
  const [isEdit, setEdit] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [start, startRef] = React.useState(null);
  const [end, endRef] = React.useState(null);


  //Pour le popup de modifications
  const [popupEventTitle, setTitle] = React.useState("");
  const [popupEventLocalisation, setLocalisation] = React.useState("");
  const [popupEventDescription, setDescription] = React.useState("");
  const [popupEventAllDay, setAllDay] = React.useState(true);
  const [popupEventDate, setDate] = React.useState([]);
  const [mySelectedDate, setSelectedDate] = React.useState(today);
  const [popupEventListInscription, setListInscription] = React.useState([]);
  const [popupEventStatus, setStatus] = React.useState("free");
  const [isOpen, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState([]);

  const myInvalid = [{
    recurring: {
      repeat: 'daily',
      until: yesterday
    }
  }, {
    start: yesterday,
    end: today
  }];


  React.useEffect(() => {
    getLocations().then((data) => {
      let locationsTab = [];
      data.forEach((location) => {
        locationsTab.push(location.name);
      });
      setLocations(locationsTab);
    });
    getJson('', (events) => {
      setListInscription(events.inscription);
      for (const event of events) {
        // convert dates to date objects
        event.start = event.start ? new Date(event.start) : event.start;
        event.end = event.end ? new Date(event.end) : event.end;
        // mark past events as fixed by setting the event.editable property to false
        event.editable = event.start && today < event.start;
      }
      setMyEvents(events);
    }, 'jsonp');
  }, []);

  const [calView, setCalView] = React.useState(
      {
        calendar: {labels: true}}

  );

  const changeView = (event) => {
    let calView;
    switch (event.target.value) {
      case 'year':
        calView = {
          calendar: {type: 'year'}
        }
        break;
      case 'month':
        calView = {
          calendar: {labels: true}
        }
        break;
      case 'week':
        calView = {
          schedule: {
            type: 'week',
            startDay: 1,
            endDay: 0,
            startTime: '06:00',
            endTime: '24:00',
            timeCellStep: 120,
            timeLabelStep: 120,
            currentTimeIndicator: true,
            allDay: false,
          }
        }
        break;
      case 'day':
        calView = {
          schedule: {
            type: 'day',
            startTime: '06:00',
            endTime: '24:00',
            allDay: false,
          }
        }
        break;
      case 'agenda':
        calView = {
          calendar: {type: 'week'},
          agenda: {type: 'week'}
        }
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  }

  const customWithNavButtons = () => {
    return <React.Fragment>
      <CalendarNav className="cal-header-nav"/>
      <div className="cal-header-picker">
        <SegmentedGroup value={view} onChange={changeView}>
          <SegmentedItem value="year">
            Year
          </SegmentedItem>
          <SegmentedItem value="month">
            Month
          </SegmentedItem>
          <SegmentedItem value="week">
            Week
          </SegmentedItem>
          <SegmentedItem value="day">
            Day
          </SegmentedItem>
          <SegmentedItem value="agenda">
            Agenda
          </SegmentedItem>
        </SegmentedGroup>
      </div>
      <CalendarPrev className="cal-header-prev"/>
      <CalendarToday className="cal-header-today"/>
      <CalendarNext className="cal-header-next"/>
    </React.Fragment>;
  }

  const getSiteId = async (localisation) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sites/all/${localisation}`,
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
          });
      if (response.ok) {
        const data = await response.json();
        return data[0].id;
      } else {
        console.log('Error getting site ID:', response.status);
        return null;
      }
    } catch (error) {
      console.log('Error getting site ID:', error);
      return null;
    }
  };

  const saveEvent = React.useCallback(async () => {
    const siteId = await getSiteId(popupEventLocalisation);
    if (!siteId) {
      console.log('Invalid site ID');
      return;
    }

    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      localisation: popupEventLocalisation,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      inscription: popupEventListInscription,
      status: popupEventStatus,
    };

   // console.log("Variables: \n " + popupEventTitle + "\n" + popupEventLocalisation + "\n" + popupEventDescription + "\n" + popupEventDate[0] + "\n" + popupEventDate[1] + "\n" + popupEventListInscription + "\n" + popupEventStatus);
    let date1 = new Date(Date.parse(popupEventDate[0]));
    let formatedDate1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')} ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`
    let date2 = new Date(Date.parse(popupEventDate[1]));
    let formatedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')} ${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()}`


    if (isEdit) {
      console.log("2");
      // update the event in the list
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];

      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
      // here you can update the event in your storage as well
      // ...
    } else {
      // On ajoute à la base de données les infos de l'évènement
      try {
        const response = await fetch('http://localhost:5000/api/dives/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: popupEventTitle,
            dive_site: siteId,
            comment: popupEventDescription,
            date_begin: formatedDate1,
            date_end: formatedDate2,
            status: 1,
            surface_security: '',
            diver_price: 0,
            instructor_price: 0,
            place_number: 10,
            registered_place: 0,
            max_ppo2: 2,

          }),
        });

        if (response.ok) {
          // Event saved successfully
          console.log('Event saved:', newEvent);
        } else {
          // Error while saving event
          console.log('Error saving event:', response.status);
        }
      } catch (error) {
        console.log('Error saving event:', error);
      }
      setMyEvents([...myEvents, newEvent]);
    }
    setSelectedDate(popupEventDate[0]);
    // close the popup
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventDate,
    popupEventDescription,
    popupEventStatus,
    popupEventTitle,
    popupEventLocalisation,
    popupEventListInscription,
    tempEvent,
  ]);

  const deleteEvent = React.useCallback(
      (event) => {
        setMyEvents(myEvents.filter((item) => item.id !== event.id));
        setTimeout(() => {
          snackbar({
            button: {
              action: () => {
                setMyEvents((prevEvents) => [...prevEvents, event]);
              },
              text: "Undo",
            },
            message: "Event deleted",
          });
        });
      },
      [myEvents]
  );
  const loadPopupForm = React.useCallback((event) => {
    setTitle(event.title);
    setLocalisation(event.localisation);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setStatus(event.status || "free");

  }, []);

  // handle popup form changes
  const titleChange = React.useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const localisationChange = React.useCallback((ev) => {
    setLocalisation(ev.target.value);
  }, []);

  const descriptionChange = React.useCallback((ev) => {
    setDescription(ev.target.value);
  }, []);


  const dateChange = React.useCallback((args) => {
    setDate(args.value);
  }, []);



  const onDeleteClick = React.useCallback(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  //delete une inscription avec un bouton
  /*
  const onDeleteInscriptionClick = React.useCallback((event) => {
      deleteInscription(event.inscription);

  }, [deleteInscription]);

*/

  const handleListInscriptionChange = (index, value) => {
    setListInscription((prevState) => {
      const updatedList = [...prevState];
      updatedList[index] = value;
      return updatedList;
    });
  }
  const renderInscriptionButtons = () => {
    return popupEventListInscription.map((inscription, index) => (
        <div key={index}>
          <Input
              type="text"
              value={inscription}
              onChange={(event) => handleListInscriptionChange(index, event.target.value)}
          />
          <Button onClick={() => handleRemoveInscription(index)}>Delete</Button>
        </div>
    ));
  }

  const handleRemoveInscription = (index) => {
    setListInscription((prevState) => {
      const updatedList = [...prevState];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }



  const onSelectedDateChange = React.useCallback((event) => {
    setSelectedDate(event.date);
  });

  const onEventClick = React.useCallback(
      (args) => {
        if (args.event.start && args.event.start < today && args.event.end < today ) {
          setEdit(false);
          toast({
            message: 'Can\'t change past or today event'
          });
          return false;
        } else {
          setEdit(true);
          setTempEvent({...args.event});

          loadPopupForm(args.event);
          setAnchor(args.domEvent.target);
          setOpen(true);
        }
      },
      [loadPopupForm]
  );

  const onEventCreate = React.useCallback(
      (args) => {
        if (args.event.start && args.event.start <= today) {
          toast({
            message: 'Can\'t create event in the past or today'
          });
          return false;
        }
        // createNewEvent(args.event, args.target)
        setEdit(false);
        setTempEvent(args.event);
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.domEvent.target);
        // open the popup
        setOpen(true);
      },
      [loadPopupForm]
  );
  const onEventDelete = React.useCallback(
      (args) => {
        deleteEvent(args.event);
      },
      [deleteEvent]
  );

  // datepicker options
  const controls = React.useMemo(
      () => (["datetime"]),
      [popupEventAllDay]
  );
  const respSetting = React.useMemo(
      () =>
          popupEventAllDay
              ? {
                medium: {
                  controls: ["calendar", "time"],
                  touchUi: false,
                },
              }
              : {
                medium: {
                  controls: ["calendar", "time"],
                  touchUi: false,
                },
              },
      [popupEventAllDay]
  );

  // popup options
  const headerText = React.useMemo(
      () => (isEdit ? "Edit event" : "New Event"),
      [isEdit]
  );
  const popupButtons = React.useMemo(() => {
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

  const onEventUpdate = React.useCallback((args) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    const oldEvent = args.oldEvent;
    const start = oldEvent && oldEvent.start ? oldEvent.start : null;
    const oldEventOccurrence = args.oldEventOccurrence;
    const occurrenceStart = oldEventOccurrence && oldEventOccurrence.start ? oldEventOccurrence.start : null;

    // handle recurring events
    if ((start && start < today) || (occurrenceStart && occurrenceStart < today)) {
      return false;
    }
  }, []);



  const onEventUpdateFailed = React.useCallback((args) => {
    if (!args.oldEventOccurrence) {
      toast({
        message: 'Can\'t move event in the past'
      });
    }
  }, []);


  return (
      <div>
        <Eventcalendar
            renderHeader={customWithNavButtons}
            height={750}
            view={calView}
            data={myEvents}
            invalid={myInvalid}
            cssClass="md-switching-view-cont"
            clickToCreate="double"
            dragToCreat={false}
            dragToMove={true}
            dragToResize={true}
            dragTimeStep={15}
            eventDelete={true}
            selectedDate={mySelectedDate}
            onSelectedDateChange={onSelectedDateChange}
            onEventClick={onEventClick}
            onEventCreate={onEventCreate}
            onEventUpdateFailed={onEventUpdateFailed}
            onEventDelete={onEventDelete}
            onEventUpdate={onEventUpdate}

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
            <Input label="Title" value={popupEventTitle} onChange={titleChange}/>
            <div className="bg-white-500 text-center ">
              <select className="border-2 m-1 text-center" value={popupEventLocalisation} onChange={localisationChange}>
               <option value="">Sélectionnez une localisation</option>
                {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                ))}
              </select>
            </div>
            <Textarea
                label="Description"
                value={popupEventDescription}
                onChange={descriptionChange}
            />
          </div>
          <div className="mbsc-form-group">
            <Input ref={startRef} label="Starts"/>
            <Input ref={endRef} label="Ends"/>
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
          </div>
          <h4 className={"text-center"}>Inscriptions:</h4>
          <div className={"mbsc-form-group"}>
            {popupEventListInscription.map((inscription, index) => (
                <div key={index}>
                  <div>
                    {/* Contenu de l'inscription */}
                  </div>
                  <div>
                    <button
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleRemoveInscription(index)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
            ))}
          </div>
          {isEdit ? (
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
          ) : null}
        </Popup>
      </div>
  );
}

export default Calendar;
