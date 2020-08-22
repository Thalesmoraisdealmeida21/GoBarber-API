import ListProviderMonthAvailability from './ListProviderMonthAvaliability';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('ListProviderMonthAvailability', () => {
  beforeEach(()=>{
    listProviderMonthAvailability = new ListProviderMonthAvailability(fakeAppointmentsRepository);
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
  });


  it('should be able to the month availability from provider', async ()=> {
      await fakeAppointmentsRepository.create({
          provider_id: 'user',
          user_id: '45646',
          date: new Date(2020, 4, 20, 8, 0, 0),
      });

      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: '45646',
        date: new Date(2020, 4, 20, 10, 0, 0),
    });


    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '45646',
      date: new Date(2020, 4, 21, 10, 0, 0),
  });


    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availabile: true},
        { day: 20, availabile: false},
        { day: 21, availabile: false},
        { day: 22, availabile: true},
    ]))
  });
});
