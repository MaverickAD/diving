import * as React from 'react';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Resources,
    MonthView,
    WeekView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    EditRecurrenceMenu,
    DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { owners } from './data-test/tasks';
import { appointments, resourcesData } from './data-test/resources';

function Calendar(){
    return (
        <Scheduler
            view="month"
            events={[
                {
                    event_id: 1,
                    title: "Event 1",
                    start: new Date("2021/5/2 09:30"),
                    end: new Date("2021/5/2 10:30"),
                },
                {
                    event_id: 2,
                    title: "Event 2",
                    start: new Date("2021/5/4 10:00"),
                    end: new Date("2021/5/4 11:00"),
                },
            ],
            selectedEventMembers: [],
            currentView: 'month',
            currentDate: new Date(), // Ajout de currentDate dans l'état initial
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.updateEventMembers = this.updateEventMembers.bind(this);
        this.onMemberToggle = this.onMemberToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.changeToToday = this.changeToToday.bind(this); // Nouvelle fonction pour le bouton "Today"
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                const addedEvent = { id: startingAddedId, ...added, members: [] };
                data = [...data, addedEvent];
                console.log(data);
            }
            if (changed) {
                data = data.map((appointment) =>
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
                );
                console.log(data);
            }
            if (deleted !== undefined) {
                data = data.filter((appointment) => appointment.id !== deleted);
                console.log(data);
            }
            return { data };
        });
    }

    updateEventMembers(eventId, selectedMembers) {
        this.setState((state) => {
            const { data } = state;
            const updatedData = data.map((appointment) => {
                if (appointment.id === eventId) {
                    return { ...appointment, members: selectedMembers };
                }
                return appointment;
            });
            return { data: updatedData };
        });
    }

    onMemberToggle(memberId) {
        this.setState((state) => {
            const { selectedEventMembers } = state;
            const isSelected = selectedEventMembers.includes(memberId);
            let updatedMembers;
            if (isSelected) {
                updatedMembers = selectedEventMembers.filter((id) => id !== memberId);
            } else {
                updatedMembers = [...selectedEventMembers, memberId];
            }
            return { selectedEventMembers: updatedMembers };
        });
    }

    changeView(viewName) {
        this.setState({ currentView: viewName });
        if (viewName === 'month') {
            const currentDate = new Date();
            this.setState({ currentDate: currentDate });
        }
        if (viewName === 'week') {
            const currentDate = new Date();
            this.setState({ currentDate: currentDate });
        }
    }

    changeToToday() {
        const currentDate = new Date();
        this.setState({ currentDate: currentDate });
    }

    render() {
        const { data, resources, selectedEventMembers, currentView, currentDate } = this.state;

        const renderMembers = ({ availableMembers, onMemberToggle }) => (
            <div>
                {availableMembers.map((member) => (
                    <div key={member.id}>
                        <input
                            type="checkbox"
                            checked={selectedEventMembers.includes(member.id)}
                            onChange={() => onMemberToggle(member.id)}
                        />
                        <span>{member.text}</span>
                    </div>
                ))}
            </div>
        );

        return (
            <Paper>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            color="inherit"
                            onClick={() => this.changeView('month')}
                            disabled={currentView === 'month'}
                        >
                            Month
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => this.changeView('week')}
                            disabled={currentView === 'week'}
                        >
                            Week
                        </Button>
                        <div style={{ marginLeft: 'auto' }}>
                            {currentView === 'month' && (
                                <React.Fragment>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
                                            this.setState({ currentDate: newDate });
                                        }}
                                    >
                                        &lt; Previous Month
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
                                            this.setState({ currentDate: newDate });
                                        }}
                                    >
                                        Next Month &gt;
                                    </Button>
                                </React.Fragment>
                            )}
                            {currentView === 'week' && (
                                <React.Fragment>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
                                            this.setState({ currentDate: newDate });
                                        }}
                                    >
                                        &lt; Previous Week
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
                                            this.setState({ currentDate: newDate });
                                        }}
                                    >
                                        Next Week &gt;
                                    </Button>
                                </React.Fragment>
                            )}
                            <Button
                                color="inherit"
                                onClick={() => this.changeToToday()}
                            >
                                Today
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Scheduler data={data}>
                    <ViewState currentDate={currentDate} currentViewName={currentView} />
                    <EditingState onCommitChanges={this.commitChanges} />
                    <EditRecurrenceMenu
                        onFieldChange={this.updateEventMembers}
                        renderMembers={renderMembers}
                        onMemberToggle={this.onMemberToggle}
                        availableMembers={resources[1].instances}
                        selectedMembers={selectedEventMembers}
                    />
                    <MonthView name="month" />
                    <WeekView name="week" cellDuration={120} startDayHour={6} intervalCount={1} />
                    <Appointments />
                    <AppointmentTooltip showOpenButton />
                    <AppointmentForm
                        basicLayoutComponent={(props) => (
                            <AppointmentForm.BasicLayout
                                {...props}
                                availableMembers={resources[1].instances}
                                selectedMembers={selectedEventMembers}
                            />
                        )}
                        textEditorComponent={(props) => (
                            <AppointmentForm.TextEditor
                                {...props}
                                availableMembers={resources[1].instances}
                                selectedMembers={selectedEventMembers}
                            />
                        )}
                    />
                    <Resources data={resources} mainResourceName="roomId" />
                    <DragDropProvider />
                </Scheduler>
            </Paper>
        );
    }
}

export default Calendar;