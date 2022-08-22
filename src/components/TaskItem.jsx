import { useDispatch } from 'react-redux'
import { Card, CardActions, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { BsCheckLg, BsFillClockFill, BsPencilSquare, BsXCircleFill } from 'react-icons/bs'
import { compareDate } from '../helpers/dateTimes'
import { handleSelectedTask } from '../store/features/tasks/taskSlice'

export const TaskItem = ({ task, handleOpenModal }) => {

    const { id, title, description, createdAt, expirationDate } = task;
    const dispatch = useDispatch();
  
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChangeChecked = ({ target }, id) => {
        const isChecked = target.checked;
        dispatch(handleSelectedTask({id, isChecked}))
    }


    return (
        <Card
            sx={{ minWidth: 275, marginTop: '2rem' }}
            style={{
                backgroundColor:
                    compareDate(createdAt, expirationDate) <= 0
                        ? '#FF8888' :
                        (compareDate(createdAt, expirationDate) > 0 && compareDate(createdAt, expirationDate) <= 3)
                            ? '#FFD95F' : '#C4EC96',
                borderRadius: '20px'
            }}
        >

            <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
                <Checkbox 
                    {...label} 
                    sx={{}}
                    onChange={(e) => handleChangeChecked(e, id)}
                />

                <BsPencilSquare
                    style={{ cursor: 'pointer', color: '#1976d2' }}
                    size={"1.5rem"}
                    onClick={() => handleOpenModal(task)}
                />
            </Grid>
            

            <Grid container spacing={2} alignItems="center" sx={{ pb: 4 }}>
                <Grid item xs={12} container direction="row" justifyContent="center" >
                    <Typography variant="h4" sx={{mt: 0}}>
                        {title}
                    </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="space-evenly" >
                    <Grid container item xs={5} justifyContent="center" alignItems="center">
                        <Typography variant="body1">
                            {description}
                        </Typography>
                    </Grid>   
                    
                    <Grid item xs={4} container justifyContent="center" direction="column">
                        <DateTimePicker
                            label="Fecha de creación"
                            readOnly
                            value={createdAt}
                            onChange={(value) => setExpirationDate(value)}
                            minDate={new Date()}
                            ampm={false}
                            renderInput={(params) =>
                                <TextField
                                    type="date"
                                    sx={{ my: 1 }}
                                    {...params}
                                />
                            }
                        />
                        <DateTimePicker
                            label="Fecha de expiración"
                            readOnly
                            value={expirationDate}
                            onChange={(value) => setExpirationDate(value)}
                            minDate={new Date()}
                            ampm={false}
                            renderInput={(params) =>
                                <TextField
                                    type="date"
                                    sx={{ my: 1 }}
                                    {...params}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                
            </Grid>

          
                {/* {
                    compareDate(createdAt, expirationDate) <= 0
                        ?
                        <BsXCircleFill size={40} />
                        :
                        (compareDate(createdAt, expirationDate) > 0 && compareDate(createdAt, expirationDate) <= 3)
                            ?
                            <BsFillClockFill size={40} />
                            :
                            <BsCheckLg size={40} />
                } */}
        </Card>
    )
}
