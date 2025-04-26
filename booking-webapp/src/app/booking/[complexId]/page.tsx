"use client";
import { bookingService, courtService } from "@/api";
import BookingModal from "@/components/BookingModal";
import { usePaginatedBookings } from "@/hooks/usePaginatedBookings";
import { CreateBookingRequest, UserSelected } from "@/interfaces/Booking";
import { Court } from "@/interfaces/Court";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function BookingPage() {
    const [open, setOpen] = useState(false);
    const [objectSelected, setObjectSelected] = useState<UserSelected>({});
    const [courts, setCourts] = useState<Court[]>([]);
    const [activeBooking, setActiveBooking] = useState<CreateBookingRequest>();
    // const [selectedCourtId, setSelectedCourtId]= useState()
    const param = useParams();
    const complexId: string = param.complexId as string;

    const { events, setEvents, filter, setFilter } = usePaginatedBookings();

    const fetchCourt = async () => {
        if (complexId) {
            const courtsRes = await courtService.getCourtsByComplexId(complexId);
            if (courtsRes && courtsRes.length > 0) {
                setFilter({ ...filter, courtId: courtsRes[0].id });
                courtsRes && setCourts(courtsRes);
            }
        }
    };

    useEffect(() => {
        fetchCourt();
    }, []);

    const handleModalCancel = () => {
        setOpen(false);
    };

    const handleModelOk = () => {
        setOpen(false);
    };

    return (
        <>
            <BookingModal
                object={objectSelected}
                open={open}
                handleCancel={handleModalCancel}
                hanldeOk={handleModelOk}
            ></BookingModal>
            <div className="w-full flex flex-col ">
                <h1>Booking now</h1>
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-state"
                            >
                                State
                            </label>
                            <div className=" ">
                                <select
                                    className="block  border rounded "
                                    id="grid-state"
                                    onChange={(e) => {
                                        setFilter({ ...filter, courtId: e.target.value });
                                    }}
                                    value={filter?.courtId}
                                    defaultValue={courts[0]?.id}
                                >
                                    {courts.map((court) => (
                                        <option key={court.id} value={court.id}>
                                            {court.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="">
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        locale={"vi"}
                        initialView="timeGridWeek"
                        weekends={true}
                        events={events}
                        select={function (e) {
                            let tempEvents = events;
                            let a: any = e.start;
                            let b: any = e.end;
                            let isCancel: boolean = false;
                            tempEvents = tempEvents.filter((event, index) => {
                                const c = event.start;
                                const d = event.end;

                                if (!c || !d) {
                                    return true;
                                }

                                if (a <= c && b >= d) {
                                    if (event.locked == true) {
                                        isCancel = true;
                                        return true;
                                    }
                                    return false;
                                }
                                if ((a > c && a < d) || (b > c && b < d)) {
                                    if (a > c) {
                                        a = c;
                                    }
                                    if (b < d) {
                                        b = d;
                                    }
                                    if (event.locked == true) {
                                        isCancel = true;
                                        return true;
                                    }
                                    return false;
                                }
                                return true;
                            });

                            if (!isCancel) {
                                const startDate = moment(e.start).format('YYYY-MM-DD');
                                const startTime = moment(e.start).format('hh:mm');
                                const endTime = moment(e.end).format('hh:mm');

                                const booking: CreateBookingRequest = {
                                    courtId: filter?.courtId,
                                    startDate: startDate,
                                    startTime: startTime,
                                    endTime: endTime,
                                };
                                setActiveBooking(booking);
                                console.log(booking);
                                
                                tempEvents = tempEvents.filter((event) => event.locked);
                                setEvents([
                                    ...tempEvents,
                                    { id: v4() + "", start: a, end: b, backgroundColor: "orange", locked: false },
                                ]);
                            }
                        }}
                        // editable={true}
                        // droppable={true}
                        eventClick={(e) => {
                            setEvents(events.filter((event) => event.locked || event.id !== e.event.id));
                        }}
                        selectable={true}
                        eventContent={renderEventContent}
                    />
                </div>
            </div>
        </>
    );
}
function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div>
            <b>{eventInfo.timeText}</b>
            <i> - {eventInfo.event.title}</i>
        </div>
    );
}
export default BookingPage;
